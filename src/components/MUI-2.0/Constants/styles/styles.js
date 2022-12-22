// export const avatharHoverEffect = {
//   width: "100px",
//   height: "100px",
//   transition: "transform 0.10s ease-in-out",
//   "&:hover": {
//     transform: "scale3d(1.15, 1.15, 1)",
//     cursor: "pointer",
//     zIndex: "1",
//   },
// };

export const button = {
  width: "100%",
  webkitJustifyContent: "flexStart",
  justifyContent: "flexStart",
};

export const alignCenter = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export const spinnerBackdrop = {
  position: "fixed",
  zIndex: "10000",
  width: "100%",
  height: "100%",
  // top: "50%",
  // left: "50%",
  transform: "translate(50% 50%)",
  background: "rgb(0,0,0,0.6)",
};

export const spinner = {
  position: "absolute",
  zIndex: "100",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  top: "50%",
  left: "50%",
  transform: "translate(50% 50%)",
};

export const primaryBorder = {
  border: `1px solid`,
  borderColor: "primary.main",
  borderRadius: 8,
};
