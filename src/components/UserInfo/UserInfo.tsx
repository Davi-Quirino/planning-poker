import React from "react";
import { UserInfoContainer, UserName, UserRole } from "./UserInfo.styles";

interface UserInfoProps {
  name: string;
  role: string;
}

const UserInfo: React.FC<UserInfoProps> = ({ name, role }) => {
  return (
    <UserInfoContainer>
      <UserName>{name}</UserName>
      <UserRole>Role: {role}</UserRole>
    </UserInfoContainer>
  );
};

export default UserInfo;
