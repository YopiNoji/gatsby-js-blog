import React from "react";
import { useSpring, animated } from "react-spring";

const scrollRatio = (): number => {
  return Math.round(
    (document.documentElement.scrollTop /
      (document.documentElement.scrollHeight -
        document.documentElement.clientHeight)) *
      100
  );
};
const BGAnimation: React.VFC = () => {
  React.useEffect(() => {
    document.addEventListener("scroll", onScroll);
    return (): void => document.removeEventListener("scroll", onScroll);
  });
  const [springProps, setSpring] = useSpring(() => ({
    transform: `translateY(0%) rotate(45deg)`,
  }));
  const onScroll = () => {
    const position = scrollRatio();
    setSpring
      .update({
        transform: `translateY(${position}%) rotate(45deg)`,
      })
      .start();
  };
  return (
    <animated.div
      className="absolute opacity-75 w-over h-full bg-gradient-to-r from-transparent to-gray-700 dark:to-gray-300"
      style={springProps}
    />
  );
};

export default BGAnimation;
