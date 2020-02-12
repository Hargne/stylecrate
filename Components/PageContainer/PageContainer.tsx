import React from "react";
import {
  Platform,
  RefreshControl,
  ScrollViewProps,
  View,
  ScrollView,
  Text
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

type Props = {
  children: React.ReactNode;
  scrollEnabled?: boolean;
  keyboardAvoid?: boolean;
  keyboardShouldPersistTaps?: ScrollViewProps["keyboardShouldPersistTaps"];
  showLoader?: boolean;
  centerContentVertically?: boolean;
  loaderReplacesContent?: boolean;
  loaderColor?: string;
  loaderText?: string;
  noPadding?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
};

const PageContainer: React.FunctionComponent<Props> = ({
  children,
  showLoader,
  loaderReplacesContent = true,
  loaderText,
  loaderColor,
  centerContentVertically,
  keyboardAvoid,
  onRefresh,
  refreshing,
  noPadding,
  ...props
}) => {
  if (showLoader && loaderReplacesContent) {
    return <Text>Loading</Text>;
  }

  const refreshControl = onRefresh ? (
    <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
  ) : null;

  const content = (
    <ScrollView
      refreshControl={refreshControl}
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ minHeight: "100%", flex: 1, padding: noPadding ? 0 : 24 }}
      {...props}
    >
      <View
        style={{
          minHeight: "100%",
          width: "100%",
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: 0,
          marginBottom: 0
        }}
      >
        {showLoader && !loaderReplacesContent && <Text>Loading</Text>}
        {centerContentVertically && (
          <View style={{ minHeight: "100%", justifyContent: "center" }}>
            {children}
          </View>
        )}
        {!centerContentVertically && children}
      </View>
    </ScrollView>
  );

  if (keyboardAvoid) {
    return (
      <KeyboardAwareScrollView
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === "ios"}
        style={{ minHeight: "100%" }}
      >
        {content}
      </KeyboardAwareScrollView>
    );
  }

  return content;
};

export default PageContainer;
