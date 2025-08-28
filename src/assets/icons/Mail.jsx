import theme from "src/theme/theme.jsx";

const Mail = ({color = theme.palette.text.primary}) => {
    return (
        <svg width="38" height="31" viewBox="0 0 38 31" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M38 0H0V5.06563L19 15L38 5.06384V0Z" fill={color}/>
            <path d="M38 9L19 18.4441L0 9.0017V31H38V9Z" fill={color}/>
        </svg>
    )
}

export default Mail;