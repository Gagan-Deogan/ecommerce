import { Loader } from "common-components/Loader";
import { Error } from "common-components/Error";

export const GenricSection = ({
  isLoading,
  isSuccess,
  children,
  className,
}) => {
  if (isLoading) {
    return <Loader />;
  }
  if (!isSuccess) {
    return <Error />;
  }
  return <section className={className}>{children}</section>;
};
