import type { Result } from '@internetarchive/result-type';
import type { UserListsError } from './user-lists-error';
import type { SearchResult } from '@internetarchive/search-service';
import type {
  UserList,
  UserListMember,
  UserListMemberOptions,
  UserListOptions,
} from './models';

export interface UserListsServiceInterface {
  /**
   * Fetches the full set of the given user's lists from the backend service.
   * The result does not include the members array for each list; only the list metadata.
   *
   * If fetching lists for the currently logged-in user, their user id will automatically
   * be replaced by `me` in the endpoint URL.
   *
   * @param userId The ID of the user to fetch lists for (e.g., `@brewster`)
   */
  fetchAllListsForUser(
    userId: string,
  ): Promise<Result<UserList[], UserListsError>>;

  /**
   * Fetches a specific user list, including the list metadata and the array of list
   * members. Note that the list members returned include only the basic information
   * kept in the user lists store, not the full item metadata. For that, use `fetchListMembers`.
   *
   * @param userId The ID of the user whose list should be fetched
   * @param listId The ID of the list to fetch (with respect to the given user)
   */
  fetchList(
    userId: string,
    listId: string,
  ): Promise<Result<UserList, UserListsError>>;

  /**
   * Fetches the full set of the current user's lists from the backend service,
   * each equipped with an additional flag specifying whether the given item is
   * included in that list.
   *
   * @param itemId The ID of the archive item to query lists for
   */
  fetchOwnListsContainingItem(
    itemId: string,
  ): Promise<Result<UserList[], UserListsError>>;

  /**
   * Fetches an array of SearchResults representing all of the members of the
   * given user list, prepared for rendering on tiles.
   *
   * @param userId The ID of the user whose list members should be fetched
   * @param listId The ID of the list to fetch (with respect to the given user)
   */
  fetchListMembers(
    userId: string,
    listId: string,
  ): Promise<Result<SearchResult[], Error>>; // hits PPS via SearchService

  /**
   * Creates a new User List with the given options.
   * @param options Details about the new list to create (e.g., name, description, privacy)
   * @returns A Result object containing the newly-created UserList if successful,
   * or an error otherwise.
   */
  createList(
    options: UserListOptions,
  ): Promise<Result<UserList, UserListsError>>;

  /**
   * Updates the given properties of an existing User List.
   * @param listId The id of the list to update
   * @param options An object containing the new property values to apply to the list
   * @returns A Result object containing the newly-updated UserList if successful,
   * or an error otherwise.
   */
  updateList(
    listId: string,
    options: Partial<UserListOptions>,
  ): Promise<Result<UserList, UserListsError>>;

  /**
   * Deletes the given User List entirely.
   * @param listId The id of the list to delete.
   * @returns A boolean indicator of success; if true, the list was removed successfully.
   */
  deleteList(listId: string): Promise<Result<boolean, UserListsError>>;

  /**
   * Adds a new member to an existing User List.
   * @param listId The id of the list to which the member should be added.
   * @param options Details about the member to add (e.g., item identifier, subfile, search term)
   * @returns A Result object containing the newly-added UserListMember if successful,
   * or an error otherwise.
   */
  addMemberToList(
    listId: string,
    options: UserListMemberOptions,
  ): Promise<Result<UserListMember, UserListsError>>;

  /**
   * Removes the given member from the given User List.
   * @param listId The id of the list to remove a member from.
   * @param memberId The id of the member within the specified list that should be removed.
   * @returns A boolean indicator of success; if true, the list member was removed successfully.
   */
  removeMemberFromList(
    listId: string,
    memberId: string,
  ): Promise<Result<boolean, UserListsError>>;
}
