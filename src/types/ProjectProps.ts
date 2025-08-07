



export type ProjectRegion = {
  siDo: string;
  siGunGu: string;
};

export type ProjectRecruitPosition = {
  positionName: string;
  recruitNumber: number;
  mainTasks: string;
  preferentialTreatment: string;
  preferMbti: string;
};

export type ProjectDetailData = {
  introduce: string;
  itemName: string;
  itemProfileImageUrl: string;
  memberName: string;
  gender: boolean;
  age: number;
  mbti: string;
  email: string;
  school: string;
  regions: ProjectRegion[];
  description: string;
  recruitPositions: ProjectRecruitPosition[];
  likedByCurrentUser: boolean;
};
