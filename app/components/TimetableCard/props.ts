export type TimetableCardProps = {
  locationName?: string
  courseName?: string
  courseTime?: string
  courseTeacher?: string
  isButtonVisible?: boolean
  onButtonPress?: (string) => void
  bottomContent?: any
}
