const Recruitment = () => {
    return (
        <div>
            <div className="flex justify-between items-center my-2 mx-6 bg-gray-200 px-2 py-1 rounded-2xl">
                <div>
                    <h1 className="text-xl font-bold">Recruitment Actions</h1>
                    <p>Manage and complete manager reviews for the Q3 2026 cycle.</p>
                </div>

                {/* <div className="stats stats-vertical lg:stats-horizontal shadow">
                    <div className="p-2">
                        <div className="stat-title">Total Reviews</div>
                        <div className="flex items-center gap-1">
                            <div aria-label="status" className="status status-accent"></div>
                            <h2>{allReview.length}</h2>
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="stat-title">Not Completed</div>
                        <div className="flex items-center gap-1">
                            <div aria-label="status" className="status status-accent"></div>
                            <h2>{notCompleted.length}</h2>
                        </div>
                    </div>

                    <div className="p-2">
                        <div className="stat-title">Completed</div>
                        <div className="flex items-center gap-1">
                            <div aria-label="status" className="status status-accent"></div>
                            <h2>{status.length}</h2>
                        </div>
                    </div>
                </div> */}
                <button className="btn btn-primary btn-outline">+ Add Candidate</button>
            </div>
            <div className="flex items-center gap-3 ms-5 my-3">
                <div className="badge badge-soft badge-primary">
                    <div aria-label="status" className="status status-primary"></div>
                    Applied
                </div>
                <div className="badge badge-soft badge-secondary"><div aria-label="status" className="status status-secondary"></div>Screening</div>
                <div className="badge badge-soft badge-accent"><div aria-label="status" className="status status-accent"></div>Interview</div>
                <div className="badge badge-soft badge-info"><div aria-label="status" className="status status-neutral"></div>Offer</div>
                <div className="badge badge-soft badge-success"><div aria-label="info" className="status status-info"></div>Hired</div>
                <div className="badge badge-soft badge-warning"><div aria-label="success" className="status status-success"></div>Rejected</div>
            </div>

            <div className="ms-6 flex items-center gap-10">
                <div className="badge badge-soft badge-primary">
                    <div aria-label="status" className="status status-primary"></div>
                    Applied
                </div>
                <p>3</p>
                <button className="btn">+</button>
            </div>

        </div >
    )
}
export default Recruitment;