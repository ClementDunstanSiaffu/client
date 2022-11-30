
import { css } from 'jimu-core';

// custom styles applied to the Button component from Jimu UI:
// const customButtonStyles = (props) => {
//   const theme = props.theme;
//   const buttonType = props.type;
//   console.log(this,props.theme.colors.primary)
//   return css`
//     /* make the primary button's text to be bold and has a shadow */
//     ${buttonType === 'primary' && `
//       font-weight: ${theme.typography.weights.bold};
//       box-shadow: ${theme.boxShadows.default};
//     `}
//   `;
// }

// export {customButtonStyles as Button}

// const globalCss = (props)=>{
//   return css `
//     body{
//       font-size:80%;
//       background-color:orange
//     }
//   `;
// }

// export {globalCss as Global}

const globalFonts = (props)=>{
  return css `
    @import url('https://fonts.googleapis.com/css?family=Open+Sans');
  `
}

export {globalFonts as Global}