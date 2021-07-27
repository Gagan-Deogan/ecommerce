import { Loader } from "common-components/Loader";
import { Error } from "common-components/Error";

export const GenricSection = ({
  isLoading,
  isError,
  retry,
  children,
  className,
}) => {
  if (isLoading) {
    return <Loader />;
  }
  if (isError) {
    return <Error retry={retry} />;
  }
  return <section className={className}>{children}</section>;
};
