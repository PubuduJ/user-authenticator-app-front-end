import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setAppState } from "../../redux/features/appStateSlice";

type Props = {
  state?: string,
  children: ReactNode;
};

const PageWrapper = ({ state, children }: Props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (state) {
      dispatch(setAppState(state));
    }
  }, [dispatch, state]);

  return (
      <>{children}</>
  );
};

export default PageWrapper;