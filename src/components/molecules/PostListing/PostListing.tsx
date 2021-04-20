import React from "react";
import { navigate } from "gatsby";
import { MarkdownRemarkEdge } from "../../../gatsby-graphql";
import { H2, SmallText } from "@Components/atoms/Typography";
import { Badge } from "@Components/atoms/Badge";
import { Card } from "@Components/atoms/Card";
import { useSpring, animated } from "react-spring";

type PropsType = {
  data: MarkdownRemarkEdge[];
};

const calc = (x: number, y: number) =>
  `perspective(600px) rotateX(${
    -(y - window.innerWidth / 2) / 20
  }deg) rotateY(${(x - window.innerHeight / 2) / 20}deg) scale(1.1)`;

const PostListing: React.FC<PropsType> = ({ data, ...props }) => {
  const [springProps, spring] = useSpring(() => ({
    transform: `perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)`,
    config: { mass: 10, tension: 550, friction: 140 },
  }));

  const onMouseMoveHandle = (e: { clientX: number; clientY: number }) =>
    spring.update({ transform: calc(e.clientX, e.clientY) }).start();

  const onMouseLeaveHandle = () =>
    spring
      .update({
        transform: `perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)`,
      })
      .start();

  const handleOnClick = React.useCallback((e) => {
    navigate("/" + e);
  }, []);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data?.map((row, index) => {
        return (
          <animated.div
            key={index}
            onMouseMove={onMouseMoveHandle}
            onMouseLeave={onMouseLeaveHandle}
            style={springProps}
          >
            <Card
              onClick={() => handleOnClick(String(row.node.frontmatter?.slug))}
              className="cursor-pointer"
            >
              <div className="px-6 py-4">
                <H2>{String(row.node.frontmatter?.title)}</H2>
                <SmallText>{row.node.frontmatter?.date}</SmallText>
                <Badge>{row.node.frontmatter?.category}</Badge>
                <br />
                <div className="flex flex-wrap">
                  {row.node.frontmatter?.tags?.map((row, index) => (
                    <Badge key={index}>{row}</Badge>
                  ))}
                </div>
              </div>
            </Card>
          </animated.div>
        );
      })}
    </div>
  );
};

export default PostListing;
