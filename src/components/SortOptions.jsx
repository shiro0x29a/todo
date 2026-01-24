function SortOptions({ sortBy, setSortBy }) {
  return (
    <div id="sortOptions">
      <span>Sort by:</span>

      <button
        className={sortBy === 'created-desc' ? 'active' : ''}
        onClick={() => setSortBy('created-desc')}
      >
        Newest
      </button>

      <button
        className={sortBy === 'created-asc' ? 'active' : ''}
        onClick={() => setSortBy('created-asc')}
      >
        Oldest
      </button>

      <button
        className={sortBy === 'edited-desc' ? 'active' : ''}
        onClick={() => setSortBy('edited-desc')}
      >
        Recently Edited
      </button>

      <button
        className={sortBy === 'edited-asc' ? 'active' : ''}
        onClick={() => setSortBy('edited-asc')}
      >
        Least Recently Edited
      </button>
    </div>
  )
}

export default SortOptions
