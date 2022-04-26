export type DateType = {
  readonly createdDate: string
  readonly updatedDate: string | null
}

export type FileType = string

export type UserType = {
  readonly id: number
  readonly role: string
  readonly email: string
  readonly password: string
  readonly avatar: string
  readonly firstName: string
  readonly lastName: string
  readonly fullName: string
  readonly phone: string
  readonly description: string
}

// ----------------- NEW -----------------
export type NewPasswordDTO = {
  password: string,
  newPassword: string,
  confirmPassword: string
}
