import React from 'react';
import { requireNativeComponent, type ViewProps } from 'react-native';

const NativeComposeCounterView = requireNativeComponent<ViewProps>('ComposeCounterView');

export type ComposeCounterViewProps = ViewProps;

export default function ComposeCounterView(props: ComposeCounterViewProps) {
  return <NativeComposeCounterView {...props} />;
}
