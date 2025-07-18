// import ic_portfoliopage from '../../../assets/icons/ic_portfoliopage.svg';
import ic_github from '../../../assets/icons/ic_github.svg';
import { Document, Page } from 'react-pdf';
import { useState } from 'react';

import { pdfjs } from 'react-pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const MemberPortfolio = () => {
    const [numPages, setNumPages] = useState<number | null>(null);
    const [pageNumber, setPageNumber] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
        setPageNumber(1); // 처음 로딩 시 첫 페이지
    };
    
    return (
        <section>
            <p className="headline-medium-emphasis mb-3">자기소개서&nbsp;&nbsp;•&nbsp;&nbsp;포트폴리오</p>
                <div className="bg-white rounded-[12px] border border-[#79747E]/[0.16] p-6 w-full">
                    <p className="p-6 border border-[rgba(121,116,126,0.16)] rounded-[8px] mb-12">
                        창업에 누구보다 진심입니다. 같이 열정을 불태워서 실제로 수익 창출까지 프로덕트를 성장시킬 팀원을 구합니다. 반드시 제가 1등합니다.창업에 누구보다 진심입니다. 같이 열정을 불태워서 실제로 수익 창출까지 프로덕트를 성장시킬 팀원을 구합니다. 반드시 제가 1등합니다.창업에 누구보다 진심입니다. 같이 열정을 불태워서 실제로 수익 창출까지 프로덕트를 성장시킬 팀원을 구합니다. 반드시 제가 1등합니다.창업에 누구보다 진심입니다. 같이 열정을 불태워서 실제로 수익 창출까지 프로덕트를 성장시킬 팀원을 구합니다. 반드시 제가 1등합니다.
                    </p>
                    <Document
                        file="/dev_portfolio.pdf" // public 폴더에 sample.pdf가 있어야 함
                        onLoadSuccess={onDocumentLoadSuccess}
                    >
                        <Page pageNumber={pageNumber} />
                    </Document>

                    {numPages !== null && (
  <p className="mt-4 flex gap-4 items-center">
    <button
      onClick={() => pageNumber > 1 && setPageNumber(pageNumber - 1)}
      disabled={pageNumber <= 1}
    >
      &lt;
    </button>
    <span>
      Page {pageNumber} of {numPages}
    </span>
    <button
      onClick={() => pageNumber < numPages && setPageNumber(pageNumber + 1)}
      disabled={pageNumber >= numPages}
    >
      &gt;
    </button>
  </p>
)}


                    <div className="flex items-center flex-wrap gap-4 mt-12">
                        <img src={ic_github} alt="깃허브" />
                        <img src={ic_github} alt="깃허브" />
                    </div>
                </div>
        </section>
    );
};

export default MemberPortfolio;