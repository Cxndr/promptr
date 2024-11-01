import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationComponentProps = {
	currentPage: number;
	totalPages: number;
};

const PaginationComponent: React.FC<PaginationComponentProps> = ({
	currentPage,
	totalPages,
}: {
	currentPage: number;
	totalPages: number;
}) => {
	const generatePaginationItems = () => {
		const items = [];

		// First page
		if (currentPage > 2) {
			items.push(
				<PaginationItem key={1}>
					<PaginationLink href={`?page=1`}>1</PaginationLink>
				</PaginationItem>
			);
			if (currentPage > 3) {
				items.push(<PaginationEllipsis key="start-ellipsis" />);
			}
		}

		// Pages around the current page
		const startPage = Math.max(2, currentPage - 1);
		const endPage = Math.min(totalPages - 1, currentPage + 1);

		for (let i = startPage; i <= endPage; i++) {
			items.push(
				<PaginationItem key={i}>
					<PaginationLink href={`?page=${i}`} isActive={i === currentPage}>
						{i}
					</PaginationLink>
				</PaginationItem>
			);
		}

		// Ellipsis and last page
		if (currentPage < totalPages - 2) {
			items.push(<PaginationEllipsis key="end-ellipsis" />);
		}
		if (currentPage < totalPages - 1) {
			items.push(
				<PaginationItem key={totalPages}>
					<PaginationLink href={`?page=${totalPages}`}>
						{totalPages}
					</PaginationLink>
				</PaginationItem>
			);
		}

		return items;
	};
	return (
		<Pagination>
			<PaginationContent className="bg-background-raised/70 rounded-2xl shadow-md shadow-themeshadow">
				<PaginationItem>
					<PaginationPrevious
						href={`?page=${currentPage - 1}`}
						disabled={currentPage === 1}
						className="hover:bg-background-pure/45 rounded-2xl"
					/>
				</PaginationItem>
				{generatePaginationItems()}
				<PaginationItem>
					<PaginationNext
						href={`?page=${currentPage + 1}`}
						disabled={currentPage === totalPages}
						className="hover:bg-background-pure/45 rounded-2xl"
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
};
export default PaginationComponent;
