export interface UserListMember {
  /** The id of this list member, unique within the current list */
  member_id: string;
  /** The identifier of the Archive item that this member represents */
  identifier: string;
  /** The timestamp when this member was added to the list */
  date_added: Date;
  /** (Optional) A subfile path within the item that this member represents */
  file?: string;
  /** (Optional) The search term within the item that this member represents */
  search_term?: string;
}

export interface UserList {
  /** The id of this list, unique among the current user's lists */
  id: string;
  /** The user-generated title for the list */
  list_name: string;
  /** The user-generated description for the list */
  description: string;
  /** Whether the list is marked private */
  is_private: boolean;
  /** The timestamp when this list was first created */
  date_created: Date;
  /** The timestamp when this list was last updated */
  date_updated: Date;
  /** The total number of members in this list */
  count: number;
  /** The array of members within this list (not always present) */
  members?: UserListMember[];
}

/** Options that can be specified when creating or editing a list */
export interface UserListOptions {
  /** The title to apply to the list */
  list_name: string;
  /** The description to apply to the list */
  description: string;
  /** Whether the list should be marked private */
  is_private: boolean;
}

/** Options that can be specified when adding a member to a list */
export interface UserListMemberOptions {
  /** The identifier of the Archive item that the new member should represent */
  identifier: string;
  /** (Optional) A subfile path within the item that the new member should represent */
  file?: string;
  /** (Optional) A search term within the item that the new member should represent */
  search_term?: string;
}
