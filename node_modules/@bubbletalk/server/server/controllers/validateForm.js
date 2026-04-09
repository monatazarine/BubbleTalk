let formSchema;

const validateForm = async (req, res, next) => {
  try {
    if (!formSchema) {
      const common = await import('@bubbletalk/common');
      formSchema = common.formSchema;
    }

    const formData = req.body;
    await formSchema.validate(formData);
    console.log("Validation successful");
    next();
  } catch (err) {
    console.error("Validation error:", err);
    res.status(422).send();
  }
};

module.exports = validateForm;
