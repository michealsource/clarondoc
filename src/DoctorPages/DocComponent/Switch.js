import * as React from 'react';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'okaye' } };

export default function SwitchesSize() {
  return (
    <div>
      <Switch {...label} defaultChecked />
    </div>
  );
}