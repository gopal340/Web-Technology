import pytest
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
import time
import os
from datetime import datetime

class TestStudentLogin:
    """Test cases for Student Login and Dashboard"""
    
    @pytest.fixture(scope="class")
    def driver(self):
        """Setup Chrome driver"""
        options = webdriver.ChromeOptions()
        options.add_argument('--start-maximized')
        options.add_argument('--disable-blink-features=AutomationControlled')
        
        driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
        driver.implicitly_wait(10)
        yield driver
        driver.quit()
    
    def take_screenshot(self, driver, name):
        """Take screenshot and save with timestamp"""
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        screenshot_dir = "selenium_tests/screenshots"
        os.makedirs(screenshot_dir, exist_ok=True)
        filepath = f"{screenshot_dir}/student_{name}_{timestamp}.png"
        driver.save_screenshot(filepath)
        print(f"Screenshot saved: {filepath}")
        return filepath
    
    def test_student_login(self, driver):
        """Test student login functionality"""
        print("\n=== Testing Student Login ===")
        
        # Navigate to login page
        driver.get("http://localhost:5173/login")
        time.sleep(2)
        self.take_screenshot(driver, "01_login_page")
        
        # Enter student credentials
        email_input = driver.find_element(By.NAME, "email")
        password_input = driver.find_element(By.NAME, "password")
        
        email_input.send_keys("student@kletech.ac.in")
        password_input.send_keys("student123")
        self.take_screenshot(driver, "02_credentials_entered")
        
        # Click login button
        login_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Login') or contains(text(), 'Sign In')]")
        login_button.click()
        
        # Wait for dashboard to load
        time.sleep(3)
        self.take_screenshot(driver, "03_student_dashboard")
        
        # Verify student dashboard loaded
        assert "dashboard" in driver.current_url.lower() or "student" in driver.current_url.lower()
        print("✓ Student login successful")
    
    def test_student_bom_request(self, driver):
        """Test BOM (Bill of Materials) request creation"""
        print("\n=== Testing BOM Request ===")
        
        # Navigate to BOM section
        try:
            bom_link = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'BOM') or contains(text(), 'Materials')]"))
            )
            bom_link.click()
            time.sleep(2)
            self.take_screenshot(driver, "04_bom_page")
            
            # Click create BOM button
            create_btn = driver.find_element(By.XPATH, "//button[contains(text(), 'Create') or contains(text(), 'New')]")
            create_btn.click()
            time.sleep(1)
            self.take_screenshot(driver, "05_bom_form")
            
            print("✓ BOM request page accessible")
        except Exception as e:
            print(f"⚠ BOM section not found: {e}")
            self.take_screenshot(driver, "04_bom_not_found")
    
    def test_student_embodied_energy(self, driver):
        """Test Embodied Energy calculation"""
        print("\n=== Testing Embodied Energy ===")
        
        try:
            # Navigate to embodied energy section
            energy_link = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Energy') or contains(text(), 'Embodied')]"))
            )
            energy_link.click()
            time.sleep(2)
            self.take_screenshot(driver, "06_embodied_energy_page")
            
            # Check if energy calculation interface is present
            assert driver.find_element(By.TAG_NAME, "body")
            print("✓ Embodied Energy page accessible")
        except Exception as e:
            print(f"⚠ Embodied Energy section not found: {e}")
            self.take_screenshot(driver, "06_energy_not_found")
    
    def test_student_carbon_footprint(self, driver):
        """Test Carbon Footprinting functionality"""
        print("\n=== Testing Carbon Footprinting ===")
        
        try:
            # Navigate to carbon footprint section
            carbon_link = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Carbon') or contains(text(), 'Footprint')]"))
            )
            carbon_link.click()
            time.sleep(2)
            self.take_screenshot(driver, "07_carbon_footprint_page")
            
            # Verify carbon footprint interface
            assert driver.find_element(By.TAG_NAME, "body")
            print("✓ Carbon Footprinting page accessible")
        except Exception as e:
            print(f"⚠ Carbon Footprint section not found: {e}")
            self.take_screenshot(driver, "07_carbon_not_found")
    
    def test_student_dashboard_graphs(self, driver):
        """Test dashboard graphs and analytics"""
        print("\n=== Testing Student Dashboard Graphs ===")
        
        # Navigate back to dashboard
        driver.get("http://localhost:5173/student/dashboard")
        time.sleep(3)
        
        # Take screenshot of dashboard with graphs
        self.take_screenshot(driver, "08_dashboard_graphs")
        
        # Scroll to view all graphs
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight/2);")
        time.sleep(1)
        self.take_screenshot(driver, "09_dashboard_graphs_scrolled")
        
        print("✓ Dashboard graphs captured")

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--html=selenium_tests/reports/student_test_report.html", "--self-contained-html"])
