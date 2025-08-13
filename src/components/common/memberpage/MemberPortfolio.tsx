// import ic_portfoliopage from '../../../assets/icons/ic_portfoliopage.svg';
import ic_github from '../../../assets/icons/ic_github.svg';
import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useRef, useState } from 'react';
import type { MemberDetailData } from '../../../types/MemberProps';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

type MemberPortfolioProps = {
    profileTitle: string;
    portfolios: MemberDetailData['portfolios'];
}

const MemberPortfolio = ({ profileTitle, portfolios }: MemberPortfolioProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerWidth, setContainerWidth] = useState<number>(700);
    const [numPages, setNumPages] = useState<number | null>(null);
    // const portfolios = data.portfolios;

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    };

    // PDF 크기에 따라 너비 측정
    useEffect(() => {
        const resizeObserver = new ResizeObserver((entries) => {
            const width = entries[0].contentRect.width;
            setContainerWidth(width);
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => resizeObserver.disconnect();
    }, []);
    
    return (
        <section>
            <p className="headline-medium-emphasis mb-3">자기소개서&nbsp;&nbsp;•&nbsp;&nbsp;포트폴리오</p>
                <div className="bg-white rounded-[12px] border border-[#79747E]/[0.16] w-full p-6">
                    <p className="p-6 border border-[rgba(121,116,126,0.16)] rounded-[8px] mb-12">
                        {profileTitle}
                    </p>
                    
                    {/* 반응형 PDF wrapper */}
                    {portfolios.length > 0 && portfolios[0].fileUrl.endsWith('.pdf') && (
                        <div
                            className="h-[700px] overflow-y-scroll border rounded-md px-4 py-2"
                            ref={containerRef}
                        >
                            <Document
                                file={portfolios[0].fileUrl}
                                onLoadSuccess={onDocumentLoadSuccess}
                            >
                                {numPages &&
                                    Array.from({ length: numPages }, (_, index) => (
                                        <Page
                                        key={`page_${index + 1}`}
                                        pageNumber={index + 1}
                                        width={containerWidth - 32}
                                        className="mb-8 shadow"
                                        renderTextLayer={false}
                                        renderAnnotationLayer={false}
                                        />
                                ))}
                            </Document>
                        </div>
                    )}


                    <div className="flex items-center flex-wrap gap-4 mt-12">
                        {portfolios.map((portfolio, idx) => (
                            <a
                                key={idx}
                                href={portfolio.fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-[304px] rounded-lg border border-[#C8C5D0] overflow-hidden"
                                >
                                <img src={ic_github} alt={portfolio.name} className="w-full h-auto" />
                                <div className="bg-white py-2 px-4 flex flex-start title-medium-emphasis">
                                    {portfolio.name}
                                </div>
                                </a>
                        ))}
                        {/* <div className="w-[304px] rounded-lg border border-[#C8C5D0] overflow-hidden">
                            <img src={ic_github} alt="깃허브" className="w-full h-auto" />
                            <div className="bg-white py-2 px-4 flex flex-start title-medium-emphasis">
                                일론박의 Github
                            </div>
                        </div>
                        <div className="w-[304px] rounded-lg border border-[#C8C5D0] overflow-hidden">
                            <img src={ic_github} alt="깃허브" className="w-full h-auto" />
                            <div className="bg-white py-2 px-4 flex flex-start title-medium-emphasis">
                                일론박의 Github
                            </div>
                        </div> */}
                    </div>
                </div>
        </section>
    );
};

export default MemberPortfolio;