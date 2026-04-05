const validateForm = async (req, res) => {
  const { formSchema } = await import('@bubbletalk/common');
  const formData = req.body;
  formSchema
    .validate(formData)
    .catch(err => {
      return res.status(422).send();
    })
    .then(valid => {
      if (valid) {
        res.status(200).send();
        console.log("form is good");
      }
    });
};
module.exports = validateForm;