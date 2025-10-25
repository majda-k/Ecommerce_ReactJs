import ContentLoader from "react-content-loader";
import { Table } from "react-bootstrap";


const TableSkeleton = (props: React.ComponentProps<typeof ContentLoader>) => {
    const renderTableRows = Array(5).fill(0).map((_, rowIndex) => (
        <tr key={rowIndex}>
            <td><ContentLoader speed={2} width={80} height={20} viewBox="0 0 80 20" backgroundColor="#e0e0e0" foregroundColor="#ecebeb" {...props}><rect x="0" y="0" rx="3" ry="3" width="60" height="16" /></ContentLoader></td>
            <td><ContentLoader speed={2} width={200} height={20} viewBox="0 0 200 20" backgroundColor="#e0e0e0" foregroundColor="#ecebeb" {...props}><rect x="0" y="0" rx="3" ry="3" width="120" height="16" /></ContentLoader></td>
            <td><ContentLoader speed={2} width={100} height={20} viewBox="0 0 100 20" backgroundColor="#e0e0e0" foregroundColor="#ecebeb" {...props}><rect x="0" y="0" rx="3" ry="3" width="80" height="16" /></ContentLoader></td>
        </tr>
    ));

    return (
        <Table className="table table-bordered">
            <thead>
                <tr>
                    <th><ContentLoader speed={2} width={120} height={25} viewBox="0 0 120 25" backgroundColor="#e0e0e0" foregroundColor="#ecebeb" {...props}><rect x="0" y="0" rx="3" ry="3" width="100" height="20" /></ContentLoader></th>
                    <th><ContentLoader speed={2} width={150} height={25} viewBox="0 0 150 25" backgroundColor="#e0e0e0" foregroundColor="#ecebeb" {...props}><rect x="0" y="0" rx="3" ry="3" width="120" height="20" /></ContentLoader></th>
                    <th><ContentLoader speed={2} width={100} height={25} viewBox="0 0 100 25" backgroundColor="#e0e0e0" foregroundColor="#ecebeb" {...props}><rect x="0" y="0" rx="3" ry="3" width="80" height="20" /></ContentLoader></th>
                </tr>
            </thead>
            <tbody>{renderTableRows}</tbody>
        </Table>
    );
};

export default TableSkeleton;