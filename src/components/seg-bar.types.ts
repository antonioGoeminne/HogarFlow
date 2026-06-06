export type SegOption = {
  id: string;
  label: string;
};

export type SegBarProps = {
  value: string;
  onChange: (id: string) => void;
  options: SegOption[];
};
