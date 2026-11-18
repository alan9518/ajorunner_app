import {
  HeaderActions,
  HeaderAvatar,
  HeaderLeft,
  HeaderRight,
  HeaderRoot,
  HeaderTitles,
} from "./Header";

export const Header = Object.assign(HeaderRoot, {
  Left: HeaderLeft,
  Right: HeaderRight,
  Avatar: HeaderAvatar,
  Titles: HeaderTitles,
  Actions: HeaderActions,
});
