# ApicurioRegistry SDK exists test

import pytest
from apicurioregistry_sdk import ApicurioRegistrySDK


class TestExists:

    def test_should_create_test_sdk(self):
        testsdk = ApicurioRegistrySDK.test(None, None)
        assert testsdk is not None
