import React from 'react';
import UnfoldMoreIcon from '@mui/icons-material/UnfoldMore';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const SortButton = ({ sortKey, currentSort, onSort }) => {
    const getSortIcon = () => {
        if (!currentSort || currentSort.key !== sortKey) {
            return <UnfoldMoreIcon />;
        }

        return currentSort.asc ? <ArrowUpwardIcon /> : <ArrowDownwardIcon />;
    };

    return (
        <button
            onClick={() => onSort(sortKey)}
            className="ml-1 text-text-primary hover:text-gray-300 transition-colors"
        >
            {getSortIcon()}
        </button>
    );
};

export default SortButton;