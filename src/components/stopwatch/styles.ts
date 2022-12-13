import styled, { css } from "styled-components/native";

export const StopWatch = styled.View`
  display: flex;
  align-items: center;

  width: 100%;
  padding: 16px;
`;

export const StopWatchText = styled.Text`
  font-size: 64px;

  margin-bottom: 16px;
`;

export const StopWatchFooter = styled.View`
  display: flex;

  flex-direction: row;

  gap: 8px;
`;

interface StopWatchButtonProps {
  noMargin?: boolean;
}

export const StopWatchButton = styled.TouchableOpacity<StopWatchButtonProps>`
  background: #000;

  margin-left: 16px;

  padding: 8px 16px;
  border-radius: 4px;

  ${({ noMargin }) =>
    noMargin &&
    css`
      margin: 0;
    `}
`;

export const StopWatchButtonText = styled.Text`
  color: #fff;
  font-size: 20px;
  font-weight: bold;
`;

export const Divider = styled.View`
  width: 100%;
  height: 1px;

  background: #000;
  margin: 16px 0;

  align-self: center;
`;

export const StopWatchSummary = styled.View`
  display: flex;
  flex: 1;
  width: 100%;

  padding: 16px;
`;

export const StopWatchSummaryHeader = styled.View`
  display: flex;

  margin-bottom: 16px;
`;

export const StopWatchSummaryText = styled.Text`
  font-size: 20px;
  font-weight: 500;
`;

export const StopWatchInfo = styled.Text`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const StopWatchFlatList = styled.FlatList``;
