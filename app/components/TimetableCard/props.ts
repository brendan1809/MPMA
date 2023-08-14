export type TimetableCardProps = {
  courseCode?: string;
  courseName?: string;
  courseTime?: string;
  courseTeacher?: string;
  isButtonVisible?: boolean;
  onButtonPress?: (string) => void
};