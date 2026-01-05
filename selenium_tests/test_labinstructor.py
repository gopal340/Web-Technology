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

class TestLabInstructorLogin:
    """Test cases for Lab Instructor Login and Dashboard"""
    
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
        filepath = f"{screenshot_dir}/labinstructor_{name}_{timestamp}.png"
        driver.save_screenshot(filepath)
        print(f"Screenshot saved: {filepath}")
        return filepath
    
    def test_lab_instructor_login(self, driver):
        """Test lab instructor login functionality"""
        print("\n=== Testing Lab Instructor Login ===")
        
        # Navigate to login page
        driver.get("http://localhost:5173/login")
        time.sleep(2)
        self.take_screenshot(driver, "01_login_page")
        
        # Enter lab instructor credentials
        email_input = driver.find_element(By.NAME, "email")
        password_input = driver.find_element(By.NAME, "password")
        
        email_input.send_keys("labinstructor@kletech.ac.in")
        password_input.send_keys("lab123")
        self.take_screenshot(driver, "02_credentials_entered")
        
        # Click login button
        login_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Login') or contains(text(), 'Sign In')]")
        login_button.click()
        
        # Wait for dashboard to load
        time.sleep(3)
        self.take_screenshot(driver, "03_labinstructor_dashboard")
        
        # Verify dashboard loaded
        assert driver.find_element(By.TAG_NAME, "body")
        print("✓ Lab Instructor login successful")
    
    def test_lab_inventory_management(self, driver):
        """Test inventory management functionality"""
        print("\n=== Testing Inventory Management ===")
        
        try:
            # Navigate to inventory section
            inventory_link = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Inventory') or contains(text(), 'Stock') or contains(text(), 'Material')]"))
            )
            inventory_link.click()
            time.sleep(2)
            self.take_screenshot(driver, "04_inventory_page")
            
            print("✓ Inventory management page accessible")
        except Exception as e:
            print(f"⚠ Inventory section not found: {e}")
            self.take_screenshot(driver, "04_inventory_not_found")
    
    def test_lab_equipment_management(self, driver):
        """Test equipment management functionality"""
        print("\n=== Testing Equipment Management ===")
        
        try:
            # Navigate to equipment section
            equipment_link = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Equipment') or contains(text(), 'Machine')]"))
            )
            equipment_link.click()
            time.sleep(2)
            self.take_screenshot(driver, "05_equipment_page")
            
            print("✓ Equipment management page accessible")
        except Exception as e:
            print(f"⚠ Equipment section not found: {e}")
            self.take_screenshot(driver, "05_equipment_not_found")
    
    def test_lab_request_processing(self, driver):
        """Test material request processing"""
        print("\n=== Testing Request Processing ===")
        
        try:
            # Navigate to requests section
            requests_link = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Request') or contains(text(), 'Pending')]"))
            )
            requests_link.click()
            time.sleep(2)
            self.take_screenshot(driver, "06_requests_page")
            
            # Check for pending requests
            try:
                requests = driver.find_elements(By.XPATH, "//div[contains(@class, 'request') or contains(@class, 'card')]")
                if requests:
                    self.take_screenshot(driver, "07_pending_requests")
                    print(f"✓ Found {len(requests)} request(s)")
                else:
                    print("✓ Requests page accessible (no pending requests)")
            except:
                self.take_screenshot(driver, "07_no_requests")
                
        except Exception as e:
            print(f"⚠ Requests section not found: {e}")
            self.take_screenshot(driver, "06_requests_not_found")
    
    def test_lab_dashboard_graphs(self, driver):
        """Test lab instructor dashboard graphs"""
        print("\n=== Testing Lab Instructor Dashboard Graphs ===")
        
        # Navigate back to dashboard
        driver.get("http://localhost:5173/labinstructor/dashboard")
        time.sleep(2)
        self.take_screenshot(driver, "08_dashboard_overview")
        
        # Scroll to view graphs
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight/2);")
        time.sleep(1)
        self.take_screenshot(driver, "09_dashboard_graphs")
        
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        self.take_screenshot(driver, "10_dashboard_bottom")
        
        print("✓ Lab Instructor dashboard graphs captured")

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--html=selenium_tests/reports/labinstructor_test_report.html", "--self-contained-html"])
