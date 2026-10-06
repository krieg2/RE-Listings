const Paginator = ({ currentPage, totalPages, pageSelectCallback, previousCallback, nextCallback }) => {
    const pageButtons = [];
    for(let i=1; i <= totalPages; i++) {
        pageButtons.push(<button key={i} data-testid={`page-button-${i}`} className={currentPage === i-1 ? 'active' : 'inactive'} onClick={() => pageSelectCallback(i-1)}>{i}</button>);
    }
    return (<div>
        <button onClick={previousCallback}>{"<"}</button>
        {pageButtons}
        <button onClick={nextCallback}>{">"}</button>
    </div>);
};

export default Paginator;