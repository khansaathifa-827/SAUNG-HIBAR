
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("addAreaForm");
  const photoInput = document.getElementById("areaPhoto");
  const photoUpload = document.getElementById("photoUpload");
  const photoPreview = document.getElementById("photoPreview");
  const resetButton = document.getElementById("resetButton");
  const toast = document.getElementById("toast");

  const storageKey = "saungHibarAreaList";
  let photoData = "";
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.remove("hidden");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add("hidden");
    }, 2500);
  }

  // Pratinjau foto yang dipilih
  photoInput.addEventListener("change", () => {
    const file = photoInput.files[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      showToast("Pilih file gambar yang valid.");
      photoInput.value = "";
      return;
    }

    // Batas ukuran foto 5 MB
    if (file.size > 5 * 1024 * 1024) {
      showToast("Ukuran foto maksimal 5 MB.");
      photoInput.value = "";
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      photoData = reader.result;
      photoPreview.src = photoData;
      photoUpload.classList.add("has-image");
    };

    reader.readAsDataURL(file);
  });

  function resetForm() {
    form.reset();

    photoInput.value = "";
    photoData = "";
    photoPreview.removeAttribute("src");
    photoUpload.classList.remove("has-image");
  }

  // Batal mengosongkan kembali form
  resetButton.addEventListener("click", () => {
    resetForm();
    showToast("Form berhasil dikosongkan.");
  });

  // Simpan data area ke localStorage
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const facilities = [
      ...form.querySelectorAll('input[name="facility"]:checked')
    ].map((input) => input.value);

    if (facilities.length === 0) {
      showToast("Pilih minimal satu fasilitas.");
      return;
    }

    const area = {
      id: Date.now(),
      areaName: document.getElementById("areaName").value.trim(),
      areaBlock: document.getElementById("areaBlock").value,
      areaCapacity: Number(
        document.getElementById("areaCapacity").value
      ),
      areaStatus: document.getElementById("areaStatus").value,
      facilities,
      areaDescription: document.getElementById("areaDescription").value.trim(),
      areaPhoto: photoData
    };

    try {
      const savedAreas = JSON.parse(
        localStorage.getItem(storageKey) || "[]"
      );

      if (!Array.isArray(savedAreas)) {
        showToast("Data area tidak valid.");
        return;
      }

      const duplicate = savedAreas.some(
        (item) =>
          item.areaBlock.toLowerCase() === area.areaBlock.toLowerCase() &&
          item.areaName.toLowerCase() === area.areaName.toLowerCase()
      );

      if (duplicate) {
        showToast("Nama area dan blok tersebut sudah ada.");
        return;
      }

      savedAreas.push(area);
      localStorage.setItem(storageKey, JSON.stringify(savedAreas));

      showToast("Area berhasil disimpan!");
      resetForm();
    } catch (error) {
      console.error("Gagal menyimpan area:", error);
      showToast("Gagal menyimpan data area.");
    }
  });
});
