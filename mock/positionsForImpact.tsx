export interface Position {
  top: number | string;
  left: number | string;
  width: number | string;
  height: number | string;
}

export const centerPosition: Position = {
  top: 0,
  left: "0%",
  width: "100%",
  height: "50%"
};

export const rightPosition: Position = {
  top: "175%",
  left: "0%",
  width: "49.2%",
  height: "30%"
};

export const leftPosition: Position = {
  top: "175%",
  left: "103%",
  width: "49.2%",
  height: "30%"
};

export const leftMain: Position = {
  top: 0,
  left: "0%",
  width: "50%",
  height: "50%"
};

export const LeftUpper: Position = {
  top: 0,
  left: "200%",
  width: "25%",
  height: "25%"
};

export const RightUpper: Position = {
  top: 0,
  left: "300%",
  width: "25%",
  height: "25%"
};

export const LeftLower: Position = {
  top: "100%",
  left: "200%",
  width: "25%",
  height: "25%"
};

export const RightLower: Position = {
  top: "100%",
  left: "300%",
  width: "25%",
  height: "25%"
};