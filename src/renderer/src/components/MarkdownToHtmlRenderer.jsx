import { marked } from "marked";
import DOMPurify from "dompurify";

const convertMarkdownToHtml = (markdown) => {
    const rawHtml = marked(markdown);
    console.log(markdown)
    console.log(rawHtml)
    const sanitized = DOMPurify.sanitize(rawHtml);
    console.log(sanitized)
    return  sanitized// Sanitizing to avoid XSS attacks
};

const MarkdownToHtmlRenderer = ({ markdown }) => {
    return <div dangerouslySetInnerHTML={{ __html: convertMarkdownToHtml(markdown) }} />;
};

// const MarkdownToHtmlRenderer = ({ markdown }) => {
//     return <div>{parse(convertMarkdownToHtml(markdown))}</div>;
// };

// const MarkdownToHtmlRenderer = ({ markdown }) => {
//     const contentRef = useRef(null);

//     useEffect(() => {
//         if (contentRef.current) {
//             contentRef.current.innerHTML = convertMarkdownToHtml(markdown);
//         }
//     }, [markdown]);

//     return <div ref={contentRef} />;
// };

export default MarkdownToHtmlRenderer;