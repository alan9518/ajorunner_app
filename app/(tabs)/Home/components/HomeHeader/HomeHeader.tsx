import { Header } from "@/src/shared/components/header";
import { SettingsButton } from "@/src/shared/components/Settings/SettingsButton";
export const HomeHeader = () => {
  return (
    <Header>
      <Header.Left>
        <Header.Avatar />
        <Header.Titles greeting="Welcome " name="Runner" />
      </Header.Left>
      <Header.Right>
        <Header.Actions>
          <SettingsButton />
        </Header.Actions>
      </Header.Right>
    </Header>
  );
};
