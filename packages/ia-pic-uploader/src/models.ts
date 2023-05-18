export interface FileModel {
  name?: '';
  size?: '';
  type?: '';
  lastModified?: '';
}

export type FilesModel = {
  length?: number;
  files?: FileModel[];
};

export type URL = string;

export type UserModel = {
  [key: string]: string;
};

export type ErrorModel = {
  email?: string;
  screenname?: string;
  password?: string;
};

export type NewsLetterModel = {
  ml_best_of?: boolean;
  ml_events?: boolean;
  ml_donors?: boolean;
};

export type ServiceResponseModel = {
  status: boolean;
  message: string;
};
