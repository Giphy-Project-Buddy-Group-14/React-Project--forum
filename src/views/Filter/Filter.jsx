import PropTypes from 'prop-types';

export default function Filter({ filters, onChange }) {
  return (
    <div>
      {Object.keys(filters).map((filterCategory) => {
        const filterItems = filters[filterCategory] || [];

        return (
          <div key={filterCategory}>
            <h3 className="ml-3">
              {filterCategory} ({filterItems.length})
            </h3>
            {filterItems.map((filter) => (
              <div
                className="border-b border-gray-200 pb-1"
                key={filter.label}
              >
                <label className="ml-3 text-sm text-gray-600 pt-2 flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 mr-2 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    onChange={(e) => {
                      const checked = e.target.checked;

                      const newFilters = filterItems.map((f) => {
                        if (f.label === filter.label) {
                          f.checked = checked;
                        }
                        return f;
                      });

                      filters[filterCategory] = newFilters;

                      onChange({ ...filters });
                    }}
                  />
                  <div>{filter.label}</div>
                </label>
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

Filter.propTypes = {
  filters: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
};
