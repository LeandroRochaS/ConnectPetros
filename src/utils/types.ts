export type ContractType = {
  id?: string;
  title?: string;
  description?: string;
  date?: string;
  sector?: string;
  status?: string;
  userId?: string;
};

export type UserProfileType = {
  id?: string;
  fullName?: string;
  email?: string;
  cpf?: string;
  sector?: string;
  password?: string;
  role?: string;
  imgUrl: string;
  anotacoes?: [];
};

export type AgendaType = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [x: string]: any;
  day: string;
  schedule: {
    time: string;
    subject: string;
    description: string;
  }[];
};

export type ScheduleType = {
  time: string;
  subject: string;
  description: string;
};
