package com.satyam.document_qa.service;

import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.text.PDFTextStripper;
import org.springframework.stereotype.Service;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Path;

@Service
public class PdfTextExtractor {

    private static final int OCR_DPI = 300;

    public String extractText(Path pdfPath) throws IOException {

        try (PDDocument document = Loader.loadPDF(pdfPath.toFile())) {

            System.out.println("PDF pages: " + document.getNumberOfPages());

            // -------------------------------------------------
            // STEP 1: Try normal PDF text extraction
            // -------------------------------------------------

            PDFTextStripper stripper = new PDFTextStripper();

            stripper.setSortByPosition(true);
            stripper.setStartPage(1);
            stripper.setEndPage(document.getNumberOfPages());

            String text = stripper.getText(document);

            System.out.println("PDFBox extracted characters: " + text.length());

            // -------------------------------------------------
            // STEP 2: If PDFBox found useful text, use it
            // -------------------------------------------------

            if (text != null && text.trim().length() > 20) {

                System.out.println("Using PDFBox text extraction.");

                System.out.println("========== PDF TEXT ==========");
                System.out.println(text);
                System.out.println("========== END PDF TEXT ==========");

                return text.trim();
            }

            // -------------------------------------------------
            // STEP 3: PDFBox found little/no text
            //         → Use OCR
            // -------------------------------------------------

            System.out.println(
                    "PDFBox found little/no text. Starting OCR..."
            );

            String ocrText = extractUsingOCR(document);

            System.out.println(
                    "OCR extracted characters: " + ocrText.length()
            );

            System.out.println("========== OCR TEXT ==========");
            System.out.println(ocrText);
            System.out.println("========== END OCR TEXT ==========");

            return ocrText.trim();
        }
    }

    private String extractUsingOCR(PDDocument document) throws IOException {

        PDFRenderer renderer = new PDFRenderer(document);

        Tesseract tesseract = new Tesseract();

        // Windows Tesseract installation
        tesseract.setDatapath(
                "C:\\Program Files\\Tesseract-OCR\\tessdata"
        );

        tesseract.setLanguage("eng");

        StringBuilder extractedText = new StringBuilder();

        for (int page = 0; page < document.getNumberOfPages(); page++) {

            System.out.println(
                    "OCR processing page " + (page + 1)
            );

            BufferedImage image = renderer.renderImageWithDPI(
                    page,
                    OCR_DPI,
                    ImageType.RGB
            );

            try {

                String pageText = tesseract.doOCR(image);

                extractedText
                        .append(pageText)
                        .append("\n\n");

            } catch (TesseractException e) {

                throw new IOException(
                        "OCR failed on page " + (page + 1),
                        e
                );
            }
        }

        return extractedText.toString();
    }
}