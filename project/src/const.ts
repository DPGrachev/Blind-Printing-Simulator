export const enum AppRoute {
  Main = '/',
  Trainer = '/trainer',
  Result = '/result',
  Auth = '/authorization',
}

export const enum ActionType {
  SetResults = 'user/set-results',
  Authorization = 'user/login',
  UnAuthorization = 'user/logout',
  SetUserName = 'user/set-user-name',
  SetGameMode = 'game/set-game-mode',
}

export const enum AuthStatus {
  Auth = 'auth',
  NoAuth = 'noAuth',
}

export const enum GameMode {
  None = 'none',
  Classic = 'classic',
  Arcade = 'arcade',
}