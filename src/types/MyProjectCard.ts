export interface MyProjectCardProps {
  status: "참여중" | "제안 수락됨" | "제안 거절됨" | "모집중" | "모집마감";
  title: string;
  PM_name: string;
  univ: string;
  location: string;
}
