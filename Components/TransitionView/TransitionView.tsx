import React, { useEffect, useState } from "react";
import { Animated } from "react-native";

type TransitionType =
  | "fadeIn"
  | "fadeOut"
  | "fadeInUp"
  | "fadeInDown"
  | "fadeInRight"
  | "fadeInLeft"
  | "fadeOutDown"
  | "fadeOutUp";

interface Props {
  transitionIn?: TransitionType;
  transitionOut?: TransitionType;
  transitionInSpeed?: number;
  transitionOutSpeed?: number;
  isActive?: boolean;
  transitionInDelay?: number;
  transitionOutDelay?: number;
}

const TransitionView: React.FunctionComponent<Props> = ({
  isActive = true,
  ...props
}) => {
  const [anim] = useState(new Animated.Value(0));
  const [shouldRenderChildren, setShouldRenderChildren] = useState(isActive);

  const getTransitionAnimation = (transition: TransitionType) => {
    switch (transition) {
      case "fadeInUp":
      case "fadeOutDown":
        return {
          opacity: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          }),
          top: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0]
          })
        };
      case "fadeInRight":
        return {
          opacity: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          }),
          left: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0]
          })
        };
      case "fadeInLeft":
        return {
          opacity: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          }),
          left: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0]
          })
        };
      case "fadeOutUp":
      case "fadeInDown":
        return {
          opacity: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          }),
          top: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [-50, 0]
          })
        };
      case "fadeIn":
      case "fadeOut":
      default:
        return {
          opacity: anim.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1]
          })
        };
    }
  };

  useEffect(() => {
    if (isActive) {
      setShouldRenderChildren(true);
      Animated.timing(anim, {
        toValue: 1,
        duration: props.transitionInSpeed || 500,
        delay: props.transitionInDelay || 0
      }).start();
    } else {
      Animated.timing(anim, {
        toValue: 0,
        duration: props.transitionOutSpeed || 500,
        delay: props.transitionOutDelay || 0
      }).start(() => setShouldRenderChildren(false));
    }
  }, [isActive]);

  return (
    <Animated.View
      style={{
        position: "relative",
        ...getTransitionAnimation(
          isActive ? props.transitionIn : props.transitionOut
        )
      }}
    >
      {shouldRenderChildren && props.children}
    </Animated.View>
  );
};

export default TransitionView;
