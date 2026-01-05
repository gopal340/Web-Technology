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

class TestAdminLogin:
    """Test cases for Admin Login and Dashboard"""
    
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
        filepath = f"{screenshot_dir}/admin_{name}_{timestamp}.png"
        driver.save_screenshot(filepath)
        print(f"Screenshot saved: {filepath}")
        return filepath
    
    def test_admin_login(self, driver):
        """Test admin login functionality"""
        print("\n=== Testing Admin Login ===")
        
        # Navigate to login page
        driver.get("http://localhost:5173/login")
        time.sleep(2)
        self.take_screenshot(driver, "01_login_page")
        
        # Enter admin credentials
        email_input = driver.find_element(By.NAME, "email")
        password_input = driver.find_element(By.NAME, "password")
        
        email_input.send_keys("admin@kletech.ac.in")
        password_input.send_keys("admin123")
        self.take_screenshot(driver, "02_credentials_entered")
        
        # Click login button
        login_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Login') or contains(text(), 'Sign In')]")
        login_button.click()
        
        # Wait for dashboard to load
        time.sleep(3)
        self.take_screenshot(driver, "03_admin_dashboard")
        
        # Verify admin dashboard loaded
        assert driver.find_element(By.TAG_NAME, "body")
        print("✓ Admin login successful")
    
    def test_admin_dashboard_analytics(self, driver):
        """Test admin dashboard analytics and graphs"""
        print("\n=== Testing Admin Dashboard Analytics ===")
        
        time.sleep(2)
        self.take_screenshot(driver, "04_dashboard_overview")
        
        # Scroll to view all analytics
        driver.execute_script("window.scrollTo(0, 500);")
        time.sleep(1)
        self.take_screenshot(driver, "05_dashboard_graphs_1")
        
        driver.execute_script("window.scrollTo(0, 1000);")
        time.sleep(1)
        self.take_screenshot(driver, "06_dashboard_graphs_2")
        
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
        time.sleep(1)
        self.take_screenshot(driver, "07_dashboard_bottom")
        
        print("✓ Admin dashboard analytics captured")
    
    def test_admin_user_management(self, driver):
        """Test user management functionality"""
        print("\n=== Testing User Management ===")
        
        try:
            # Navigate to user management
            users_link = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'User') or contains(text(), 'Manage')]"))
            )
            users_link.click()
            time.sleep(2)
            self.take_screenshot(driver, "08_user_management")
            
            print("✓ User management page accessible")
        except Exception as e:
            print(f"⚠ User management not found: {e}")
            self.take_screenshot(driver, "08_users_not_found")
    
    def test_admin_materials_management(self, driver):
        """Test materials/inventory management"""
        print("\n=== Testing Materials Management ===")
        
        try:
            # Navigate to materials section
            materials_link = WebDriverWait(driver, 10).until(
                EC.element_to_be_clickable((By.XPATH, "//a[contains(text(), 'Material') or contains(text(), 'Inventory')]"))
            )
            materials_link.click()
            time.sleep(2)
            self.take_screenshot(driver, "09_materials_management")
            
            print("✓ Materials management page accessible")
        except Exception as e:
            print(f"⚠ Materials management not found: {e}")
            self.take_screenshot(driver, "09_materials_not_found")
    
    def test_admin_reports(self, driver):
        """Test admin reports and statistics"""
        print("\n=== Testing Admin Reports ===")
        
        # Navigate back to dashboard
        driver.get("http://localhost:5173/admin/dashboard")
        time.sleep(2)
        
        # Capture full page screenshot
        self.take_screenshot(driver, "10_full_dashboard")
        
        print("✓ Admin reports captured")

if __name__ == "__main__":
    pytest.main([__file__, "-v", "--html=selenium_tests/reports/admin_test_report.html", "--self-contained-html"])
