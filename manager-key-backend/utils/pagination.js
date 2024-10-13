const pagination = async (model, query, conditions = {}, selectFields = '') => {
	const { page = 1, limit = 10 } = query

	const total = await model.countDocuments()

	const results = await model
		.find(conditions)
		.select(selectFields)
		.limit(Number(limit))
		.skip((Number(page) - 1) * Number(limit))
		.exec()

	return {
		total,
		results,
	}
}

module.exports = pagination
