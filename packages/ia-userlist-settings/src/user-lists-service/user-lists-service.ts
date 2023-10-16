import type { Result } from '@internetarchive/result-type';
import {
  SearchType,
  SearchResult,
  SearchServiceInterface,
} from '@internetarchive/search-service';
import type { UserServiceInterface } from '@internetarchive/user-service';
import type { UserListsServiceInterface } from './user-lists-service-interface';
import type {
  UserList,
  UserListMember,
  UserListMemberOptions,
  UserListOptions,
} from './models';
import { UserListsErrorReason, UserListsError } from './user-lists-error';

/** Required shape of the fetch handler provided to the service */
interface FetchHandlerInterface {
  fetchApiResponse<T>(
    url: string,
    options?: {
      includeCredentials?: boolean;
      method?: string;
      body?: BodyInit; // eslint-disable-line
    }
  ): Promise<T>;
}

/** Possible well-formed results from the backend service */
type BackendServiceResponse<T> =
  | { success: true; value: T }
  | { success: false; error: string };

/** Options accepted by the user lists service constructor */
type UserListsServiceConstructorOptions = {
  fetchHandler: FetchHandlerInterface;
  searchService: SearchServiceInterface;
  userService: UserServiceInterface;
  baseUrl?: string;
};

/** Service for fetching forum posts */
export class UserListsService implements UserListsServiceInterface {
  private static readonly DEFAULT_BASE_URL = 'https://archive.org';

  private fetchHandler: FetchHandlerInterface;

  private searchService: SearchServiceInterface;

  private userService: UserServiceInterface;

  private baseUrl: string;

  constructor({
    fetchHandler,
    searchService,
    userService,
    baseUrl = UserListsService.DEFAULT_BASE_URL,
  }: UserListsServiceConstructorOptions) {
    this.fetchHandler = fetchHandler;
    this.searchService = searchService;
    this.userService = userService;
    this.baseUrl = baseUrl;
  }

  private async fetchEndpoint<T>(
    url: string,
    method?: string,
    body?: BodyInit // eslint-disable-line
  ): Promise<Result<T, UserListsError>> {
    try {
      const fetchResult: BackendServiceResponse<T> =
        await this.fetchHandler.fetchApiResponse(url, {
          method,
          body,
          includeCredentials: true,
        });

      if (fetchResult.success) {
        return { success: fetchResult.value };
      }
      return {
        error: UserListsService.getErrorResult(
          UserListsErrorReason.LIST_NOT_FOUND, // TODO determine the real reason
          fetchResult.error
        ),
      };
    } catch (err) {
      return {
        error: UserListsService.getErrorResult(
          UserListsErrorReason.NETWORK,
          err
        ),
      };
    }
  }

  /** @inheritdoc */
  async fetchListsForUser(
    userId: string
  ): Promise<Result<UserList[], UserListsError>> {
    // If we are fetching lists for the currently logged-in user, we use 'me' in place of
    // their userid, to better preserve privacy.
    const loggedInUser = (await this.userService.getLoggedInUser())?.success;
    const deidentifiedUserId =
      loggedInUser?.itemname === userId ? 'me' : userId;

    return this.fetchEndpoint<UserList[]>(
      `${this.baseUrl}/services/users/${deidentifiedUserId}/lists`
    );
  }

  /** @inheritdoc */
  async fetchList(
    userId: string,
    listId: string
  ): Promise<Result<UserList, UserListsError>> {
    return this.fetchEndpoint<UserList>(
      `${this.baseUrl}/services/users/${userId}/lists/${listId}`
    );
  }

  /** @inheritdoc */
  async fetchOwnListsContainingItem(
    itemId: string
  ): Promise<Result<UserList[], UserListsError>> {
    return this.fetchEndpoint<UserList[]>(
      `${this.baseUrl}/services/users/me/lists?item=${itemId}`
    );
  }

  async fetchListMembers(
    userId: string,
    listId: string
  ): Promise<Result<UserListMember[], UserListsError>> {
    const listResult = await this.fetchList(userId, listId);
    if (!listResult.success) return listResult as Result<never, UserListsError>;

    const { members } = listResult.success;
    if (!members) {
      // The response must contain a members array -- otherwise the response is malformed.
      throw UserListsService.getErrorResult(UserListsErrorReason.BAD_RESPONSE);
    }

    return { success: members };
  }

  /** @inheritdoc */
  async fetchListMemberSearchResults(
    userId: string,
    listId: string
  ): Promise<Result<SearchResult[], Error>> {
    const membersResult = await this.fetchListMembers(userId, listId);
    if (!membersResult.success)
      return membersResult as Result<never, UserListsError>;

    const members = membersResult.success;
    if (members.length === 0) return { success: [] };

    const identifiersQuery = `identifier:(${members
      .map(m => m.identifier)
      .join(' OR ')})`;

    const searchResponse = await this.searchService.search(
      {
        query: identifiersQuery,
        rows: members.length,
        aggregations: { omit: true },
      },
      SearchType.METADATA
    );

    if (searchResponse.success) {
      return { success: searchResponse.success.response.results };
    }
    return { error: searchResponse.error };
  }

  /** @inheritdoc */
  async createList(
    options: UserListOptions
  ): Promise<Result<UserList, UserListsError>> {
    return this.fetchEndpoint<UserList>(
      `${this.baseUrl}/services/users/me/lists`,
      'POST',
      JSON.stringify(options)
    );
  }

  /** @inheritdoc */
  async updateList(
    listId: string,
    options: Partial<UserListOptions>
  ): Promise<Result<UserList, UserListsError>> {
    return this.fetchEndpoint<UserList>(
      `${this.baseUrl}/services/users/me/lists/${listId}`,
      'PATCH',
      JSON.stringify(options)
    );
  }

  /** @inheritdoc */
  async deleteList(listId: string): Promise<Result<boolean, UserListsError>> {
    return this.fetchEndpoint<boolean>(
      `${this.baseUrl}/services/users/me/lists/${listId}`,
      'DELETE'
    );
  }

  /** @inheritdoc */
  async addMemberToList(
    listId: string,
    options: UserListMemberOptions
  ): Promise<Result<UserListMember, UserListsError>> {
    return this.fetchEndpoint<UserListMember>(
      `${this.baseUrl}/services/users/me/lists/${listId}/members`,
      'POST',
      JSON.stringify(options)
    );
  }

  /** @inheritdoc */
  async removeMemberFromList(
    listId: string,
    memberId: string
  ): Promise<Result<boolean, UserListsError>> {
    return this.fetchEndpoint<boolean>(
      `${this.baseUrl}/services/users/me/lists/${listId}/members/${memberId}`,
      'DELETE'
    );
  }

  /** Construct a UserListsError with the given reason and underlying error cause */
  private static getErrorResult(reason: UserListsErrorReason, err?: unknown) {
    return new UserListsError(reason, UserListsService.getErrorMessage(err), {
      cause: err,
    });
  }

  /** Extracts a suitable error message from the given input, if possible */
  private static getErrorMessage(err: unknown): string {
    if (err instanceof Error) return err.message;
    if (typeof err === 'string') return err;
    return 'Unknown error';
  }
}
