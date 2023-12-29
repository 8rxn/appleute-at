import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
      <div className="p-4 rounded-lg bg-secondary">
        {children}
      </div>
  );
};

export default AuthLayout;
