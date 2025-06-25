// import Testimonial from '../models/Testimonial.js';

// // Yeni rəy əlavə et
// export const addTestimonial = async (req, res) => {
//   try {
//     const { author, text } = req.body;
//     if (!author || !text) {
//       return res.status(400).json({ message: 'Author və text tələb olunur.' });
//     }
//     const t = await Testimonial.create({ author, text });
//     res.status(201).json(t);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };

// // Bütün rəyləri gətir
// export const getTestimonials = async (req, res) => {
//   try {
//     const list = await Testimonial.find().sort({ date: -1 });
//     res.json(list);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message });
//   }
// };
