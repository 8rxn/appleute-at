import React from "react";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-900">
        {children}
      </div>
    </main>
  );
};

export default AuthLayout;
