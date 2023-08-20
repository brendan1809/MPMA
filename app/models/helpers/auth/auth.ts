import { Instance, SnapshotOut, types } from "mobx-state-tree"

/**
 * Auth model to hold data such as accesstoken and userid.
 */
/* eslint-disable no-param-reassign */
export const AuthModel = types
  .model("Auth")
  .props({
    id: types.maybeNull(types.string),

    studentId: types.maybeNull(types.string),
    accessToken: types.maybeNull(types.string),
    role: types.maybeNull(types.string),
    fullName: types.maybeNull(types.string),
    email: types.maybeNull(types.string),
    address: types.maybeNull(types.string),
    lat: types.maybeNull(types.number),
    lang: types.maybeNull(types.number),
    thumbnail: types.maybeNull(types.string),
    aboutUs: types.maybeNull(types.string),
    phoneNumber: types.maybeNull(types.string),
  })
  .actions((self) => ({
    update: (data) => {
      self = Object.assign(self, data)
    },
  }))
  .actions((self) => ({
    resetAuthData() {
      self.studentId = null
      self.email = null
      self.id = null
      self.thumbnail = null
      self.aboutUs = null
      self.phoneNumber = null
      self.role = null
      self.accessToken = null
      self.address = null
      self.lat = null
      self.lang = null
    },
  }))
  .views((self) => ({
    get isSignedIn() {
      return !!self.accessToken
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars

/* eslint-enable no-param-reassign */
type AuthType = Instance<typeof AuthModel>
export interface Auth extends AuthType {}
type AuthSnapshotType = SnapshotOut<typeof AuthModel>
export interface AuthSnapshot extends AuthSnapshotType {}
