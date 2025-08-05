// import ic_portfoliopage from '../../../assets/icons/ic_portfoliopage.svg';
import ic_github from '../../../assets/icons/ic_github.svg';
import { Document, Page, pdfjs } from 'react-pdf';
import { useEffect, useRef, useState } from 'react';
// import type { MemberDetailData } from '../../../types/MemberProps';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// interface MemberPortfolio {
//     data: MemberDetailData;
// }

const MemberPortfolio = () => {
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
                        창업에 누구보다 진심입니다. 같이 열정을 불태워서 실제로 수익 창출까지 프로덕트를 성장시킬 팀원을 구합니다. 반드시 제가 1등합니다.창업에 누구보다 진심입니다. 같이 열정을 불태워서 실제로 수익 창출까지 프로덕트를 성장시킬 팀원을 구합니다. 반드시 제가 1등합니다.창업에 누구보다 진심입니다. 같이 열정을 불태워서 실제로 수익 창출까지 프로덕트를 성장시킬 팀원을 구합니다. 반드시 제가 1등합니다.창업에 누구보다 진심입니다. 같이 열정을 불태워서 실제로 수익 창출까지 프로덕트를 성장시킬 팀원을 구합니다. 반드시 제가 1등합니다.
                    </p>
                    
                    {/* 반응형 PDF wrapper */}
                    <div
                        className="h-[700px] overflow-y-scroll border rounded-md px-4 py-2"
                        ref={containerRef}
                    >
                        <Document
                            file="/dev_portfolio.pdf"
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


                    <div className="flex items-center flex-wrap gap-4 mt-12">
                        <div className="w-[304px] rounded-lg border border-[#C8C5D0] overflow-hidden">
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
                        </div>
                        <div className="w-[304px] rounded-lg border border-[#C8C5D0] overflow-hidden">
                            <img src={ic_github} alt="깃허브" className="w-full h-auto" />
                            <div className="bg-white py-2 px-4 flex flex-start title-medium-emphasis">
                                일론박의 Github
                            </div>
                        </div>
                    </div>
                </div>
        </section>
    );
};

export default MemberPortfolio;