interface PdfViewerProps {
  url: string;
}
const PdfViewer: React.FC<PdfViewerProps> = ({ url }) => {
  return (
    <div className="pdf-container">
      <iframe
        src={url}
        title="PDF Viewer"
        width="1200px"
        height="500px"
        allowFullScreen
      />
    </div>
  );
};

export default PdfViewer;