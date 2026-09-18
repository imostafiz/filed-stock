const EmptyState = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mb-4 text-6xl text-gray-300">📦</div>
      <h3 className="mb-2 text-lg font-semibold text-gray-900">No products found</h3>
      <p className="text-sm text-gray-500">Try adjusting your search or filter criteria</p>
    </div>
  );
};

export default EmptyState;
